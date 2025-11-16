import faiss from "faiss-node";

let index = null;

// RESET FAISS INDEX — clears previous resume completely
export const resetFaissIndex = () => {
  index = null;
};

// Create index if not exists
export const getFaissIndex = async () => {
  if (!index) {
    index = new faiss.IndexFlatL2(384); // embedding dimension
  }
  return index;
};
