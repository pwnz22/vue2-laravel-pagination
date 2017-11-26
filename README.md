# vue2-laravel-pagination

> A vue2 Laravel Paginator

# Installation

## Support
> Laravel 5.x and Vue 2.x
## npm
```
npm install vue2-laravel-pagination --save-dev
```
## yarn
```
yarn add vue2-laravel-pagination --save-dev
```
## Then
```$xslt
import Pagination from 'vue2-laravel-pagination'
```
**In the `questions` object you must have data coming from Laravel**
```$xslt
public function getQuestion() {
    $questions = Question::paginte(5);

    return response()->json($questions, 200);
}
```
**And you must have this in reponse:**
```$xslt
current_page: 1
data: [...]
from: 1
last_page: 5
next_page_url: "http://example/all?page=2"
per_page: 5
prev_page_url: null
to: 5
total: 25
```
**After that in the .vue template:**
```$xslt
<template>
    ...
    <pagination
        :current="questions.current_page"
        :total="questions.total"
        :per-page="questions.per_page"
        @page-changed="fetchData"
    >
    </pagination>
</template>
```
> The $emit('page-changed') is triggering when the page paginate numbers or next button clicked, so you must write that method to fetch next page with your data.
## Example
```
methods: {
    fetchData(page) {
        page = page || 1
        axios.get('http://yurist/api/filter/all?page=' + page)
            .then(response => {
                this.questions = response.data
                this.questions.current_page = page
            })
            .catch(err => consolel.log(err))
    }
}
````
> Styles are written within the component. You can edit or delete them, depends on you.
## Props
```
props: {
    current: {
        type: Number,
        default: 1,
        required: true
    },
    total: {
        type: Number,
        default: 0,
        required: true
    },
    perPage: {
        type: Number,
        default: 0,
        required: true
    },
    pageSidesRange: {
        type: Number,
        default: 3
    }
}
```
> `pageSidesRange` sets the pagination side length.

## Manually
Just download src/components/Pagination.vue file and import it to your **.vue** tamplate.
```$xslt
import Pagination from './Pagination.vue
```

## Run tests
```
npm run test
```
