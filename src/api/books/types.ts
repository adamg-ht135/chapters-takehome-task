export type Book = {
title: string;
author: string|null;
date_published: string|null;
}

export type BooksResponse = {
title: string;
author: number;
date_published: string;
date_added: string;
}