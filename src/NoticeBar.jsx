import '../style';
import React from 'react';
import assign from 'object-assign';
import classNames from 'classnames';
import Icon from '@gag/icon';
import Marquee from './Marquee';

class NoticeBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  onClick = () => {
    const { mode, onClick } = this.props;
    if (onClick) {
      onClick();
    }
    if (mode === 'closable') {
      this.setState({
        show: false,
      });
    }
  }

  render() {
    const { mode, icon, onClick, children, className, prefixCls, marqueeProps, ...restProps } = this.props;

    const extraProps: any = {};
    let operationDom: any = null;
    if (mode === 'closable') {
      operationDom = (
        <div className={`${prefixCls}-operation`} onClick={this.onClick}>
          <Icon type="cross" size="md" />
        </div>
      );
    } else {
      if (mode === 'link') {
        operationDom = (
          <div className={`${prefixCls}-operation`}>
            <Icon type="right" size="md" />
          </div>
        );
      }
      extraProps.onClick = onClick;
    }

    const wrapCls = classNames({
      [prefixCls]: true,
      [className]: !!className,
    });

    let marquee = assign({}, {
      loop: false,
      leading: 500,
      trailing: 800,
      fps: '40',
      style: {},
    }, marqueeProps);

    return this.state.show ? (
      <div className={wrapCls} {...restProps} {...extraProps}>
        { icon ? <div className={`${prefixCls}-icon`}> {icon} </div> : null }
        <div className={`${prefixCls}-content`}>
          <Marquee prefixCls={prefixCls} text={children} {...marquee} />
        </div>
        {operationDom}
      </div>
    ) : null;
  }
}
NoticeBar.defaultProps = {
  prefixCls: 'am-notice-bar',
  mode:null,
  icon: <Icon type={require('../style/assets/trips.svg')} size="xxs" />,
  onClick() {},
};
NoticeBar.propTypes = {
  mode:React.PropTypes.oneOf(['closable','link']),
  onClick:React.PropTypes.func,
  icon: React.PropTypes.node,
  style:React.PropTypes.object,
  /* web only */
  className: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  marqueeProps:React.PropTypes.object
};
NoticeBar.displayName = "NoticeBar";
module.exports=NoticeBar;
