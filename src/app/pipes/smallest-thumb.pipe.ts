import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smallestThumb'
})
export class SmallestThumbPipe implements PipeTransform {

  transform(value: { [key: string]: any } ): unknown {
    const thumbs = !!value?.thumbs ? value.thumbs :
      Object.keys(value).filter(key => parseInt(key) > 0).length === Object.keys(value).length ? value :
        !!value?.image?.thumbs ? value.image.thumbs : null;
    const src = typeof value === 'string' ? value : !!value?.src ? value.src : !!value?.image?.src ? value.image.src : null;
    if (!!!thumbs) return src;
    const smallestSize = Object.keys(thumbs).map(k => parseInt(k))
      .reduce((smallest, num) => {
        if (!!!smallest) return num;
        return num < smallest ? num : smallest
      }, null);
    const smallestThumb = thumbs[`${smallestSize}`];
    if (!!!smallestThumb) return src;
    return smallestThumb;
  }

}
