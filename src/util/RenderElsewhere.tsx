
import React from 'react';
import { render } from 'react-dom';

class RenderElsewhereProps {
  targetId: string
}

class RenderElsewhere extends React.Component<RenderElsewhereProps, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateSelf();
  }

  componentDidUpdate() {
    this.updateSelf();
  }

  componentWillUnmount() {
    this.removeAppendElement();
  }

  updateSelf() {
    if (this.props.children && document.getElementById(this.props.targetId)) {
      render(<div>{this.props.children}</div>, document.getElementById(this.props.targetId))
    }
  }

  render() {
    // NOTE: since this is an append body component, we need to manage the rendering ourselves
    return null
  }

  removeAppendElement() {
  }
}


export default RenderElsewhere;