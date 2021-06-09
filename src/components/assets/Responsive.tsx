import React, { Component } from 'react';

interface ResponsiveProps {
  mobile: React.ComponentElement<any, any>;
  pc: React.ComponentElement<any, any>;
}

class Responsive extends Component<ResponsiveProps> {
  state = {
    isSmallScreen: false,
  };

  mediaQuery = window.matchMedia('(max-width: 768px)');

  componentDidMount(): void {
    try {
      this.mediaQuery.addEventListener('change', this.handleMediaQueryChange);
    } catch (e) {
      this.mediaQuery.addListener(this.handleMediaQueryChange);
    }
    this.handleMediaQueryChange(this.mediaQuery);
  }

  componentWillUnmount(): void {
    this.mediaQuery.removeEventListener('change', this.handleMediaQueryChange);
    this.mediaQuery.removeListener(this.handleMediaQueryChange);
  }

  handleMediaQueryChange = (mediaQuery: any): void => {
    if (mediaQuery.matches) {
      this.setState({ isSmallScreen: true });
    } else {
      this.setState({ isSmallScreen: false });
    }
  };

  render(): React.ComponentElement<any, any> {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        {this.state.isSmallScreen ? this.props.mobile : this.props.pc}
      </div>
    );
  }
}

export default Responsive;
