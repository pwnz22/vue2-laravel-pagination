<template>
    <div id="app">
        <ul>
            <li v-for="question in questions.data">{{ question.title }}</li>
        </ul>

        <pagination
            :current="questions.current_page"
            :total="questions.total"
            :per-page="questions.per_page"
            @page-changed="fetchData"
        ></pagination>
    </div>
</template>

<script>
    import Pagination from './components/Pagination'
    import axios from 'axios'

    export default {
        name: 'app',
        components: {Pagination},

        data() {
            return {
                questions: []
            }
        },

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
        },

        mounted() {
            this.fetchData()
        }
    }
</script>

<style>
    body {
        padding-top: 60px;
    }
</style>
