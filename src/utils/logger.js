import ReactGA from 'react-ga';

ReactGA.initialize('UA-77081345-1');

/**
 *
 * @param {String} category
 * @param {String} action
 */
const logger = ({ category, action }) => {
  if (typeof category !== 'string' || category instanceof String) {
    throw new Error(`${category} should of type string`);
  }

  if (typeof action !== 'string' || action instanceof String) {
    throw new Error(`${action} should of type string`);
  }

  ReactGA.event({
    category: category,
    action: action
  });
};

export default logger;
