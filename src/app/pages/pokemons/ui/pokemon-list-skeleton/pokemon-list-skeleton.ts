import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-list-skeleton.html',
  styleUrl: './pokemon-list-skeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListSkeleton { }
