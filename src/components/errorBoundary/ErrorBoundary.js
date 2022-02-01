import React from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends React.Component {
  state = { error: false };
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({ error: true });
  }

  //
  // getDerivedStateFromError(error) {
  //   // по сути это такой setState , которвй работая толькос ошибкой - он только его обновляет
  //   return { error: true }; // это то же самое что и componentDidCatch - работать будет также
  // }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
