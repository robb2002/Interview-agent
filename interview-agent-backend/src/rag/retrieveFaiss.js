import { embedText } from "../utils/embedding.js";
import { getFaissIndex } from "./faissIndex.js";
import { getMetadata } from "./ingestResumeFaiss.js";

export const searchFaiss = async (query, topK = 5) => {
  const index = await getFaissIndex();

  // Check if index is empty
  const ntotal = index.ntotal();
  if (ntotal === 0) {
    throw new Error("FAISS index is empty. Please add resume data first.");
  }

  // Ensure topK doesn't exceed available vectors
  const k = Math.min(topK, ntotal);

  // Embed the query text
  const queryVector = await embedText(query);

  if (!Array.isArray(queryVector) || queryVector.length !== 384) {
    throw new Error(
      `Invalid query embedding: expected array of length 384, got ${
        queryVector?.length || "invalid"
      }`
    );
  }

  // Convert to regular array format
  const queryArray = Array.from(queryVector);

  // FAISS-node search: try different formats
  let result;
  let scores, ids;

  try {
    // Try 2D array format first: [[query_vector]]
    result = index.search([queryArray], k);
    scores = result.distances[0];
    ids = result.labels[0];
  } catch (error) {
    if (error.message.includes("array length")) {
      // Try 1D array format
      try {
        result = index.search(queryArray, k);
        scores = result.distances;
        ids = result.labels;
      } catch (error2) {
        throw new Error(
          `FAISS search failed with both formats. ` +
            `Query vector length: ${queryArray.length}, ` +
            `Index vectors: ${ntotal}, ` +
            `Error: ${error2.message}`
        );
      }
    } else {
      throw error;
    }
  }

  const metadata = getMetadata();

  const matches = ids.map((id, i) => ({
    score: scores[i],
    ...metadata[id],
  }));

  return matches;
};
