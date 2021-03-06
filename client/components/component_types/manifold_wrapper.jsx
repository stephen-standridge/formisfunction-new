import * as media_types from '../media';
import { PieceMetaComponent } from './piece_meta';
import '../../styles/pieces.scss';

const Manifold = media_types.Manifold;

class ManifoldWrapperComponent extends React.Component {
	renderMedia(){
		const { component, isActive } = this.props;
		const { media } = component;
		return media && media.map( (m, i) => m.type == "program" && <Manifold key={i} slug={m.slug} isActive={isActive}/>)
	}
	render() {
		const { component, onPrev, onNext, classNames, isActive, children } = this.props;
		const { slug } = component;
		return <div className={`piece__container piece__container--${slug} ${ classNames }`}>
			<div className={`piece__wrapper piece__wrapper--${slug} clickable`} >
				{this.renderMedia()}
				{children}
			</div>
			<PieceMetaComponent component={component} />
    </div>
	}
}

export { ManifoldWrapperComponent }
