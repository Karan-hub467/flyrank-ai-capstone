import { z } from 'zod'

export const movieTool = {
  description: 'Search for a movie and return structured movie information.',

  inputSchema: z.object({
    title: z.string().min(1).describe('The movie title to search for'),
  }),

  execute: async ({ title }: { title: string }) => {
    // Demo data for the assignment.
    // This keeps the tool reliable without requiring an external API key.
    const movies: Record<
      string,
      {
        title: string
        year: number
        genre: string
        rating: number
        description: string
      }
    > = {
      inception: {
        title: 'Inception',
        year: 2010,
        genre: 'Science Fiction',
        rating: 8.8,
        description:
          'A thief who steals corporate secrets through dream-sharing technology is given an opportunity to erase his past.',
      },
      interstellar: {
        title: 'Interstellar',
        year: 2014,
        genre: 'Science Fiction',
        rating: 8.7,
        description:
          'Explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
      },
      'the dark knight': {
        title: 'The Dark Knight',
        year: 2008,
        genre: 'Action',
        rating: 9.0,
        description:
          'Batman faces a criminal mastermind who plunges Gotham into chaos.',
      },
    }

    const movie = movies[title.toLowerCase().trim()]

    if (!movie) {
      throw new Error(`Movie "${title}" was not found.`)
    }

    return {
      found: true,
      movie,
    }
  },
}