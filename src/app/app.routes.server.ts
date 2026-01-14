import { inject } from '@angular/core';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { PokemonsService } from './pokemons/services/pokemons.service';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonsService = inject(PokemonsService);
      const pokemonIds = await firstValueFrom(pokemonsService.getPokemonsForSSRPrerender());
      return pokemonsService.getPagesPokemonObject(pokemonIds);
    },
    fallback: PrerenderFallback.Server
  },
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonsService = inject(PokemonsService);
      const pokemonIds = await firstValueFrom(pokemonsService.getPokemonsForSSRPrerender());
      return pokemonsService.getPagePokemonObject(pokemonIds);
    },
    fallback: PrerenderFallback.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
