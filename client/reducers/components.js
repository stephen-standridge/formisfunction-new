import { fromJS } from 'immutable';
import { COMPONENT_ACTIONS } from '../actions/action_types'

const initialState = fromJS({})

export default function update(state = initialState, action) {
	switch(action.type) {
		case COMPONENT_ACTIONS.SUCCESS:
			let component = action.payload.component;
			let components = action.payload.components || [];
			let media = component.media;

			delete component.media;
			media.forEach((m,i)=>{
				let section = m.for || 'media';
				component[section] = component[section] || [];
				component[section].push(m);
			})
			components = components.concat(component);
			components.forEach((c) => {
				state = state.set(c.slug, fromJS(c))
			})			
		break;
	}
  return state
}