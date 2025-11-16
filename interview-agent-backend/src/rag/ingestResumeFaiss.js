import { chunkText } from "../utils/chunker.js";
import { embedText } from "../utils/embedding.js";
import { getFaissIndex } from "./faissIndex.js";

let metadataStore = [];

export const storeResumeInFaiss = async (resumeText, userId = "user1") => {
  const index = await getFaissIndex();
  const chunks = chunkText(resumeText);
  const vectorList = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i].trim();
    if (!chunk) continue;

    const embedding = await embedText(chunk);

    if (!Array.isArray(embedding) || embedding.length !== 384) {
      console.error(
        `Invalid embedding at chunk ${i}: expected array of length 384, got ${
          embedding?.length || "invalid"
        }`
      );
      continue;
    }

    // Convert to Float32Array with exactly 384 dimensions
    const vector32 = new Float32Array(384);
    for (let j = 0; j < 384; j++) {
      vector32[j] = embedding[j] || 0;
    }

    vectorList.push(vector32);

    metadataStore.push({
      id: metadataStore.length,
      text: chunk,
      userId,
      index: i,
    });
  }

  if (vectorList.length === 0) {
    throw new Error("No valid embeddings generated");
  }

  // Convert Float32Arrays to JavaScript array format for FAISS
  const vectors2D = vectorList.map((vec) => Array.from(vec));

  // FAISS-node: Add vectors one at a time to avoid array length issues
  // Single vector: pass as 1D array, multiple vectors: add individually
  if (vectors2D.length === 1) {
    index.add(vectors2D[0]);
  } else {
    // Add vectors one at a time to avoid "Invalid the given array length" error
    for (const vec of vectors2D) {
      index.add(vec);
    }
  }

  return { totalChunks: vectorList.length };
};

export const getMetadata = () => metadataStore;
