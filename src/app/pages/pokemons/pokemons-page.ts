import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage implements OnInit {
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(this.route.queryParamMap.pipe(
    map(params => params.get('page') ?? '1'),
    map(page => isNaN(+page) ? 1 : +page),
    map(page => Math.max(1, page))
  ));
  /* public isLoading = signal(true);
  private appRef = inject(ApplicationRef);
  private $appRef = this.appRef.isStable.subscribe((isStable) => {
    console.log(isStable);
  });
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }
  ngOnDestroy(): void {
    this.$appRef.unsubscribe();
  } */
  ngOnInit(): void {
    this.loadPokemons();
  }
  public loadPokemons(nextPage: number = 0) {
    const pageToLoad = this.currentPage()! + nextPage;
    this.pokemonService.loadPage(pageToLoad).pipe(
      tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
      tap(() => this.title.setTitle(`Pokemons SSR Page ${pageToLoad}`))
    ).subscribe(pokemons => this.pokemons.set(pokemons));
  }
}
