import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    dir: 'src',
    globals: true,
    environment: 'node',
  },
  build: {
    rollupOptions: {
      input: [
        'src/app.ts',
        'src/server.ts',
        // Adicione os outros arquivos aqui
      ],
      external: ['esbuild'], // Caso queira excluir esbuild
    },
  },
})
