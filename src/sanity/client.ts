// import { createClient } from 'next-sanity'

// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET 
// const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion, 
//   useCdn: false,
// })

// // 🔁 Temporary mock client to prevent crashing
export const client = {
  fetch: async () => {
    return []; // mock data
  }
};
