import * as React from 'react';
import { Route } from 'react-router-dom';
import { History } from 'history';

export interface NavigatorButtonProps { title: string; to: string; onClick: (event: any) => boolean }

export class NavigatorButton extends React.Component<NavigatorButtonProps, undefined> {
    constructor(props: any) {
        super(props);
    }

    handleClick(event: any, history: History) {
        if (this.props.onClick.apply(event)) {
            history.push(this.props.to);
        }
    }

    render() {
        return <Route render={({ history }) => (
            <button type='button' onClick={(event: any) => this.handleClick(event, history)}>
                {this.props.title}
            </button>
        )} />
    }
}
