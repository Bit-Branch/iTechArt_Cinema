import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import {
  Component, Input, ElementRef, Output, EventEmitter, ViewChild
} from '@angular/core';

import { Favor } from '@core/models/favor/favor';
import { Image } from '@core/models/image/image';
import { Movie } from '@core/models/movie/movie';

const defaultHeadingText = 'Carousel';
const defaultLinkText = 'SEE ALL';
const defaultAnimationTransition = '250ms ease-in';
const widthForAlbumOrientation = 215;
const widthForPortraitOrientation = 150;
type availableCarouselTypes = Movie | Favor;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent<T extends availableCarouselTypes> {
  defaultImagePath = 'assets/movie-cover-default-image.png';
  /**
   * Text which will be shown as heading
   */
  @Input() headingText = defaultHeadingText;
  /**
   * Text which will be shown in link to the right of the carousel
   */
  @Input() linkText = defaultLinkText;
  /**
   * Is carousel will handle photos in album orientation
   */
  @Input() albumOrientation = false;
  /**
   * Is carousel will have a link at the right which will redirect to another page
   */
  @Input() withLink = false;
  /**
   * Item's property name by which the image data will be taken and shown
   */
  @Input() itemPropertyNameForImage: keyof T | null = null;
  /**
   * Item's property name by which the data will be taken and shown as heading
   */
  @Input() itemPropertyNameForHeading: keyof T | null = null;
  /**
   * Item's property name by which the data will be taken and shown as paragraph
   */
  @Input() itemPropertyNameForParagraph: keyof T | null = null;
  /**
   * The path to which the transition will be made after the link on the right has been clicked
   */
  @Input() linkPath = '';
  /**
   * Function that will be called when user clicked on item
   */
  @Output() onItemClick = new EventEmitter<T>();
  /**
   * Function that will be called when user clicked on link on the right
   */
  @Output() onLinkClick = new EventEmitter();
  /**
   * Reference to whole carousel html element
   * @private
   */
  @ViewChild('carousel') private carousel!: ElementRef;
  /**
   * Index of the current scrolled item
   * @private
   */
  private currentItemIndex = 0;
  /**
   * Width of an item inside items list that is used in scrolling carousel calculations
   * @private
   */
  private itemWidth = 0;
  /**
   * Transition effect of scrolling animation
   * @private
   */
  private animationTransition = defaultAnimationTransition;
  private animationPlayer!: AnimationPlayer;
  private items: T[] = [];
  private itemsCount = 0;

  /**
   * Items that will be shown in carousel
   */
  @Input() set carouselItems(items: T[] | null) {
    if (items) {
      this.items = items;
      this.itemsCount = items.length;
    }
  }

  get carouselItems(): T[] {
    return this.items;
  }

  constructor(private readonly animationBuilder: AnimationBuilder) {
    if (this.albumOrientation) {
      this.itemWidth = widthForAlbumOrientation;
    } else {
      this.itemWidth = widthForPortraitOrientation;
    }
  }

  getItemImage(item: T): string | null {
    if (this.itemPropertyNameForImage) {
      return (item[this.itemPropertyNameForImage] as unknown as Image)?.content;
    }
    return null;
  }

  onPreviousClick(): void {
    if (this.currentItemIndex !== 0) {
      this.currentItemIndex = ((this.currentItemIndex - 1) + this.itemsCount) % this.itemsCount;
      this.moveCarousel();
    }
  }

  onNextClick(): void {
    if (this.currentItemIndex + 1 !== this.itemsCount) {
      this.currentItemIndex = (this.currentItemIndex + 1) % this.itemsCount;
      this.moveCarousel();
    }
  }

  onItemClicked(item: T): void {
    if (this.onItemClick.observed) {
      this.onItemClick.emit(item);
    }
  }

  onLinkClicked($event: MouseEvent): void {
    if (this.onLinkClick.observed) {
      this.onLinkClick.emit($event);
    }
  }

  private moveCarousel(): void {
    const offset = this.currentItemIndex * this.itemWidth;
    const slidingAnimation = this.animationBuilder.build(
      [
        animate(
          this.animationTransition,
          style(
            {
              transform: `translateX(-${offset}px)`
            }
          )
        )
      ]
    );
    this.animationPlayer = slidingAnimation.create(this.carousel.nativeElement);
    this.animationPlayer.play();
  }
}
