import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCard } from "../pokemon-card/pokemon-card";
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonList {
  public pokemons = input.required<SimplePokemon[]>();
}
