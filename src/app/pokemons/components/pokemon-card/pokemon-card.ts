import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { SimplePokemon } from '../../interfaces';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();
  public pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`);
  /* logEffect = effect(() => {
    console.log('Pokemon card:', this.pokemon());
  }); */
}
