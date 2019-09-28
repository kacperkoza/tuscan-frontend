import {Component, HostListener, Input, OnChanges, OnInit} from '@angular/core';
import {SimpleMatch} from '../../model/simple-match.model';
import {MatchDetails} from '../../model/match-details/match-details.model';
import {isNullOrUndefined} from 'util';
import {MatchHistory} from '../../model/match-history.model';
import {SlideInOutAnimation} from '../../animations/animations';

@Component({
  selector: 'app-match-cell',
  templateUrl: './match-cell.component.html',
  styleUrls: ['./match-cell.component.css'],
  animations: [
    SlideInOutAnimation
  ]
})
export class MatchCellComponent implements OnChanges, OnInit {

  @Input() match: SimpleMatch;
  @Input() details: MatchDetails;
  @Input() matchHistory: MatchHistory;

  public win: boolean;
  public expanded = false;
  animationState = 'out';
  public loading = false;
  public innerWidth: any;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  ngOnChanges() {
    if (!isNullOrUndefined(this.details)) {
      this.win = this.details.result === 'WIN';
    }
  }

  public expand(divName: string) {
    if (!this.loading) {
      this.loading = true;
      this.toggleShowDiv(divName);
    }
  }

  public gainedElo(): boolean {
    return this.matchHistory.eloDiff > 0;
  }

  public hasPositiveKd(): boolean {
    return this.matchHistory.kdRatio > 1.0;
  }

  public hasNegativeKd(): boolean {
    return this.matchHistory.kdRatio < 1.0;
  }

  toggleShowDiv(divName: string) {
    if (this.expanded === false) {
      this.expanded = true;
    }

    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';

      setTimeout(() => {
        this.loading = false;
      }, 800);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
  }

  dateFormat(): string {
    return this.isDesktopUser() ? 'dd/MM/yy, hh:mm a' : 'dd/MM/yy';
  }

  score(): string {
    return this.isDesktopUser()? this.details.score : this.details.score.replace('/', ':').replace(/\s/g, '');
  }

  hasHistory(): boolean {
    return !isNullOrUndefined(this.matchHistory) && this.matchHistory !== undefined;
  }

  isDesktopUser(): boolean {
    return this.innerWidth > 768;
  }
}
