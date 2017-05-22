import React, { Component } from 'react'
import { Link } from 'react-router'
import styles from './HeaderBar.scss'
import $ from 'JQuery'
import ActionHome from 'material-ui/svg-icons/action/home';
import Logout from 'material-ui/svg-icons/action/input';
import ActionMedia from 'material-ui/svg-icons/action/perm-media';
import ActionQuery from 'material-ui/svg-icons/action/perm-data-setting';
import ActionBook from 'material-ui/svg-icons/av/library-books';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class HeaderBar extends Component {

  render() {
const urlHome = `/${this.props.user}/`;
    return (

            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <header className={styles['header']}>
        <nav>
          <a href={urlHome}
            className={styles['brand']}>
            <ActionHome />
          </a>
          <ul className={styles['menu']}>
            <li className={styles['menu__item']}>
              <Link
                to={{ pathname: `/${this.props.user}/app` }}
                className={styles['menu__link']}>
                <span>
                  <ActionBook />
                </span>
              </Link>
            </li>
            <li className={styles['menu__item']}>
              <Link
                to={{ pathname: `/${this.props.user}/digital` }}
                className={styles['menu__link']}>
                <span>
                  <ActionMedia />
                </span>
              </Link>
            </li>
                        <li className={styles['menu__item']}>
              <Link
                to={{ pathname: `/${this.props.user}/query` }}
                className={styles['menu__link']}>
                <span>
                  <ActionQuery />
                </span>
              </Link>
            </li>
            <li className={styles['menu__item']}>
<a href="http://localhost:8080" className={styles['menu__link']}>

    <span >
      <Logout />
    </span>
  </a>
</li>
          </ul>
        </nav>
      </header>
      </MuiThemeProvider>
    )
  }
}
