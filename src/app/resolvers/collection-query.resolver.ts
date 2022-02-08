import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { PostType, POST_TYPES } from '../models/collections.models';
import { FuncsService } from '../services/funcs.service';


@Injectable({ providedIn: 'root' })

export class CollectionQueryResolver implements Resolve<any> {

      constructor(private funcs: FuncsService) { }

      resolve(
            route: ActivatedRouteSnapshot
      ): any {
            const collection = route?.data?.collection;
            const {
                  limit = 6,
                  sort: orderBy = collection === 'projects' ? 'order,asc' : POST_TYPES.includes(collection) ? 'publishedAt,desc' : 'createdAt,desc',
                  where = [['status', '==', 'published']]
            } = route.queryParams;
            const dbQuery: { [key:string]: any } = { limit, orderBy, where };
            const hashFragment = route.fragment;
            if (collection === 'projects') {
                  if (!!hashFragment?.length) {
                        if (!Array.isArray(dbQuery?.where))
                              dbQuery.where = [];
                        dbQuery.where.push(['sector', '==', this.funcs.handleize(hashFragment)])
                  }
            }
            if (Object.values(PostType).includes(collection) && collection !== 'posts') {
                  if (!Array.isArray(dbQuery?.where))
                        dbQuery.where = [];
                  dbQuery.where.push(['category', '==', this.funcs.handleize(collection)])
            }
            return dbQuery;
      }
}