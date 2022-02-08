import { Injectable, InjectionToken } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DbService } from './db.service';
import { FuncsService } from './funcs.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private funcs: FuncsService, private title: Title, private meta: Meta, private router: Router, private db: DbService) { }

  generateTags({ title = '', description = '', image = '' }) {
    const _title = `${title.toLowerCase().indexOf('redmond') === 0 ? '' : 'Redmond: '}${title}`;
    this.title.setTitle(_title);
    this.meta.updateTag({ name: 'og:url', content: `https://redomondconstruction.com${this.router.url}` })
    this.meta.updateTag({ name: 'og:title', content: _title })
    this.meta.updateTag({ name: 'og:description', content: description })
    this.meta.updateTag({ name: 'og:image', content: image })
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' })
  }

  // generateTags({ title = '', description = '', image = '' }) {

  //   this.title.setTitle(title);
  //   const _title = `${title.toLowerCase().indexOf('redmond') === 0 ? '' : 'Redmond: '}${title}`;
  //   this.title.setTitle(_title);
  //   this.meta.addTags([
  //     // Open Graph
  //     { name: 'og:url', content: `https://redomondconstruction.com${this.router.url}` },
  //     { name: 'og:title', content: _title },
  //     { name: 'og:description', content: description },
  //     { name: 'og:image', content: image },
  //     // Twitter Card
  //     { name: 'twitter:card', content: 'summary' }
  //   ]);
  // }

  setMetaTags({ doc = null, collectionDoc = null, image = null }) {
    const title = !!doc?.title?.length ?
      doc.title :
      !!doc?.name?.length ?
        doc.name :
        collectionDoc?.title?.length ?
          collectionDoc.title :
          'Redmond Construction';
    const description = !!doc?.description?.length ?
      doc.description :
      !!doc?.excerpt?.length ?
        doc.excerpt :
        !!collectionDoc?.description?.length ?
          collectionDoc.description :
          typeof doc?.content === 'string' && !!doc?.content?.length ?
            `${this.funcs.strip_Html(doc.content).substr(0, 200).trim()}...` :
            'Building on relationships.';
    const _image = this.getImage({ doc, image });
    this.generateTags({ title, description, image: _image });
    return { title, description, image: _image }
  }

  getImage({ doc, image }):string {
    const defaultImage = '/assets/media/redmond-favicon.png';
    if (!!image?.length) return image;
    const _image = !!doc?.image || !!doc?.images?.length ?
        !!doc?.image ?
          doc.image :
          doc.images[0] :
          doc?.blocks?.length && ['carousel', 'card'].includes(doc.blocks[0]?.blockType)?
          doc.blocks[0]?.blockType === 'carousel' && !!doc?.blocks[0]?.slides[0] && !!doc?.blocks[0]?.slides[0]?.image ?
            doc.blocks[0].slides[0].image :
          doc.blocks[0]?.blockType === 'card' && !!doc?.blocks[0]?.image ?
            doc?.blocks[0].image :
          null :
        null;
      if (!!!_image) return defaultImage;
    return !!!_image?.thumbs && !!!_image?.src ?
      _image :
      !!_image?.thumbs ?
        !!_image?.thumbs['1080'] ?
          _image.thumbs['1080'] :
        !!_image?.thumbs['1500'] ?
            _image.thumbs['1500'] :
          _image.src :
        _image.src;
  }

}

// export const SEO_SERVICE = new InjectionToken<any>('SeoService');
