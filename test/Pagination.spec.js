import {mount} from 'vue-test-utils'
import expect from 'expect'
import Pagination from '../src/components/Pagination.vue'

describe('Pagination', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Pagination, {
      propsData: {
        current: 1,
        total: 20,
        perPage: 2
      }
    })
  })

  it ('shows page numbers depending on pageSidesRange, default is 3', () => {
    expect(wrapper.findAll('.pagination li').length).toBe(5)
  })

  it ('reveals previous button if current page > 1', (done) => {
    expect(wrapper.contains('.previous-page')).toBe(false)

    wrapper.vm.current = 2

    assertOnNextTick(() => {
      expect(wrapper.contains('.previous-page')).toBe(true)
    }, done)
  })

  it ('hides next button on the last page', (done) => {
    expect(wrapper.contains('.next-page')).toBe(true)

    wrapper.vm.current = 20

    assertOnNextTick(() => {
      expect(wrapper.contains('.next-page')).toBe(false)
    }, done)
  })

  it ('hides previous button on the first page', (done) => {
    wrapper.vm.current = 2

    assertOnNextTick(() => {
      expect(wrapper.contains('.previous-page')).toBe(true)
    }, done)

    expect(wrapper.contains('.previous-page')).toBe(false)
  })

  it ('add active class to the active page button', () => {
    expect(wrapper.find('.pagination li:first-child').hasClass('active')).toBe(true)
  })

  it ('can add custom class to the main ul element', (done) => {
    expect(wrapper.find('ul').hasClass('custom-class')).toBe(false)

    wrapper.vm.customClass = 'custom-class'

    assertOnNextTick(() => {
      expect(wrapper.find('ul').hasClass('custom-class')).toBe(true)
    }, done)
  })

  let see = (text, selector) => {
    let wrap = selector ? wrapper.find(selector) : wrapper

    expect(wrap.html()).toContain(text)
  }

  let type = (selector, text) => {
    let node = wrapper.find(selector)

    node.element.value = text
    node.trigger('input')
  }

  let click = selector => {
    wrapper.find(selector).trigger('click')
  }

  let assertOnNextTick = (callback, done) => {
    wrapper.vm.$nextTick(() => {
      try {
        callback()
        done()
      } catch (e) {
        done(e)
      }
    })
  }
})
