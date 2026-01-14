import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { PokeAPIResponse, Pokemon, Result, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private http = inject(HttpClient);
  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);
    return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
    .pipe(
      map((resp) => {
        const simplePokemons = resp.results.map((pokemon) => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name
        }))
        return simplePokemons;
      })
    )
  }

  public loadPokemon(id: string) {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  public getPagesPokemonObject(pokemons: PokeAPIResponse) {
    const pokemonCount = pokemons.count / 20;
    const pokemonPages = [];
    for(let i = 1; i < pokemonCount; i++) {
      pokemonPages.push({ page: i.toString() });
    }
    return pokemonPages;
  }

  public getPagePokemonObject(pokemons: PokeAPIResponse) {
    return pokemons.results.map((pokemon) => ({
      number: pokemon.url.split('/').at(-2) ?? '',
      id: pokemon.name
    }))
  }

  public getPokemonsForSSRPrerender() {
    return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon`);
  }
}
