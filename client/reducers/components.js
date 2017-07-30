import { fromJS } from 'immutable';
import { COMPONENT_ACTIONS } from '../actions/action_types'
import { uniq } from 'lodash';

const initialState = fromJS({})

export default function update(state = initialState, action) {
	const { type, meta, payload } = action;
	switch(type) {
		case COMPONENT_ACTIONS.SUCCESS:
			{
				const { component, components } = payload;
				const { slug } = meta;
				const { media } = component;
				delete component.media;
				component.media = [];
				component.states = [];
				let collections = [];
				media && media.forEach((m,i)=>{
					const { collection, state } = m;
					if (collection) {
						component[collection] = component[collection] || [];
						component[collection].push(m);
						collections.push(collection);
					}
					if (state) {
						component.states.push(state);
					}
					component.media.push(m)
				})
				component.collections = uniq(collections);
				components && components.forEach((c) => {
					state = state.set(c.slug, fromJS(Object.assign(c, { loading: false, needsLoad: true })))
				})
				state = state.set(slug, fromJS(component));
				break;
			}
		case COMPONENT_ACTIONS.REQUESTED:
			{
				const { slug } = meta;
				state = state.update(slug, (c=fromJS({}))=> c.merge(fromJS({ loading: true, needsLoad: false })));
				break;
			}
		case COMPONENT_ACTIONS.FAILURE:
			{
				const { slug } = meta;
				const { error } = payload;
				state = state.update(slug, (c=fromJS({}))=> c.merge(fromJS({ loading: false, needsLoad: true })));
				break;
			}
	}
  return state
}
