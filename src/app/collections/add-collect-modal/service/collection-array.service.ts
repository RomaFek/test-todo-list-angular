import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, take, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ICollection} from "../../model/collection";

@Injectable({
    providedIn: 'root'
})
export class CollectionArrayService {
    private initialValue: string[] = ['work', 'person', 'pets', 'groups', 'medication', 'payments']
    private collectionSubject: BehaviorSubject<string[]> = new BehaviorSubject(this.initialValue)
    public collectionSubject$ = this.collectionSubject.asObservable()

    constructor(private http: HttpClient) {
        this.getCollections()
    }

    public setNewCollect(newCollect: string) {
        const currentCollection = this.collectionSubject.getValue();
        currentCollection.push(newCollect);
        this.collectionSubject.next(currentCollection);
        return this.http.post('addCollection', newCollect)
    }

    public getCollections() {
        this.getAllCollection().pipe(map(el => el.map((el) => el.name)),
            take(1)).subscribe(
            (col: string[]) => {
                this.collectionSubject.next(col);
            }
        );

    }

    public getAllCollection() {
        return new Observable<ICollection[]>((observer) => {
            const openRequest = indexedDB.open("collectionsStoreMain", 5);

            openRequest.onupgradeneeded = function (event) {
                const db = openRequest.result;

                if (!db.objectStoreNames.contains("collectionsStore")) {
                    db.createObjectStore("collectionsStore", {keyPath: "id"});
                }
            };

            openRequest.onsuccess = function (event) {
                const db = openRequest.result;
                const transaction = db.transaction("collectionsStore", "readonly");
                const CollStore = transaction.objectStore("collectionsStore");

                const getAllRequest = CollStore.getAll();

                getAllRequest.onsuccess = function () {
                    const arrCollect: ICollection[] = getAllRequest.result;
                    observer.next(arrCollect);
                    observer.complete();
                };

                getAllRequest.onerror = function () {
                    observer.error("Ошибка при получении коллекций: " + getAllRequest.error);
                };
            };

            openRequest.onerror = function (event) {
                observer.error("Ошибка при открытии базы данных: " + openRequest.error);
            };
        }).pipe(
            catchError(error => {
                console.error(error);
                return throwError(error);
            })
        );
    }


}
