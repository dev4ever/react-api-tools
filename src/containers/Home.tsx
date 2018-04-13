import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { State } from '../types'

const component = ({}: Props) => (
    <div>
        <h1>Mock Orgs</h1>
         
        
         
    </div>
)

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
    return bindActionCreators({
        
    }, dispatch)
}
const mapStateToProps = (state: State) => {
    return {
       
    }
}

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
export type Props = typeof stateProps & typeof dispatchProps;

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(component);