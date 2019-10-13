import {mount, createLocalVue, RouterLinkStub} from '@vue/test-utils'
import ChildPage from '~/pages/child'

const localVue = createLocalVue()

describe('page/child.vue', () => {
  test('トップページへ戻る導線が存在する', () => {
    const wrapper = mount(ChildPage, {
      localVue,
      stubs: {
        NuxtLink: RouterLinkStub
      }
    })

    expect(wrapper.find(RouterLinkStub).props().to).toBe('/')
  })
})
