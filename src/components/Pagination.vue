<template>
    <div class="vue-pagination">
        <div class="vue-pagination__left">
            <a href="#" v-if="hasPrev()" @click.prevent="changePage(prevPage)">
                <
            </a>
        </div>

        <div class="vue-pagination__mid">
            <ul>
                <li v-for="page in pages" :class="{ current: current == page }">
                    <a href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
            </ul>
        </div>

        <div class="vue-pagination__right">
            <a href="#" v-if="hasNext()" @click.prevent="changePage(nextPage)">
                >
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            current: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            },
            perPage: {
                type: Number,
                default: 0
            },
            pageRange: {
                type: Number,
                default: 3
            }
        },

        computed: {
            pages() {
                var pages = []

                for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
                    pages.push(i)
                }

                return pages
            },

            rangeStart() {
                let start = this.current - this.pageRange
                return (start > 0) ? start : 1
            },

            rangeEnd() {
                let end = this.current + this.pageRange
                return (end < this.totalPages) ? end : this.totalPages
            },

            totalPages() {
                return Math.ceil(this.total / this.perPage)
            },

            nextPage() {
                return this.current + 1
            },

            prevPage() {
                return this.current - 1
            }
        },

        methods: {
            hasPrev() {
                return this.current > 1
            },

            hasNext() {
                return this.current < this.totalPages
            },

            changePage(page) {
                this.$emit('page-changed', page)
            },

        }
    }
</script>

<style lang="scss">
    .vue-pagination {
        display: flex;
        align-items: center;
        justify-content: center;

        .current {
            background: #3b92d9;

            a {
                color: #fff;
            }
        }

        &__mid {
            display: flex;
            justify-content: center;
            width: 55%;

            ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            li {
                display: inline-block;
                padding: 5px 10px;
                line-height: 1;

                a {
                    &:hover, &:focus {
                        text-decoration: none;
                    }
                }
            }
        }

    }
</style>
