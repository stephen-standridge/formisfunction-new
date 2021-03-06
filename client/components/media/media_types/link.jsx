import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router'
import CopyToClipboard from 'react-copy-to-clipboard';

class LinkMedia extends React.Component {
	constructor(props){
		super(props);
		this.state={};
	}
	classNamesFor(part){
		const { classNames } = this.props;
		const { active } = this.state;

		return `link__${part} ${(classNames && classNames[part]) || ''}}`
	}
	render(){
		const { link } = this.props;
		if (!link) return <div className={this.classNamesFor('not_found')} />
		const { url, anchor } = link;
		const { copied } = this.state;
		const isEmail = url.split("@").length > 1;
		const copiedClass = copied == false ? 'copied_again' : copied == true ? 'copied' : ''
		return isEmail ? <CopyToClipboard text={url}
																			onCopy={() => this.setState({copied: !this.state.copied})}>
																			<span className={`clickable link__media ${copiedClass}`} >{link.anchor}</span>
											</CopyToClipboard> :
											<a className="link__media clickable" href={link.url} target="_blank">{link.anchor}</a>
		// return <RouterLink className="clickable" to={link.url}>{link.anchor}</RouterLink>
	}
}

const mapStateToProps = (state, ownProps) => {
	const link = state.media.getIn(['links', ownProps.slug]);
  return { link: link && link.toJS() }
}

const Link = connect(
	mapStateToProps
)(LinkMedia)

export {Link}
