import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  constructor(private router: Router, private heroService: HeroService) { }

  // Why not in the constructor ?
  heroes: Hero[]; // "=" initialized ":" only defined
  selectedHero: Hero;

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    // this.heroService.getHeroesSlowly().then(
    this.heroService
      .getHeroes()
      .then(heroes => this.heroes = heroes);
      // whatever => class_attribute = same_whatever
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService
      .create(name)
      .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        }
      );
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        }
      );
  }
}
