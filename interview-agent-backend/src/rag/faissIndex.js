import faiss from "faiss-node";

let index = null;

// Create index if not exists
export const getFaissIndex = async () => {
  if (!index) {
    index = new faiss.IndexFlatL2(384); // 384 dimensions for MiniLM
  }
  return index;
};
