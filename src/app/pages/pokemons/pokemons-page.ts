import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonList,
    RouterLink
  ],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => isNaN(+page) ? 1 : +page),
      map(page => Math.max(1, page))
    )
);
  public loadOnPageChange = effect(() => {
    this.loadPokemons(this.currentPage())
  });

  public loadPokemons(nextPage: number = 0) {
    this.pokemonService.loadPage(nextPage).pipe(
      tap(() => this.title.setTitle(`Pokemons SSR Page ${nextPage}`))
    ).subscribe(pokemons => this.pokemons.set(pokemons));
  }
}
