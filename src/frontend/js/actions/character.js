import request from 'superagent';
import { browserHistory } from 'react-router';
import { CHARACTER, CHARACTERS } from 'constants/actions';


const charactersRequestInit = () => {
    return {
        type: CHARACTERS.REQUEST
    }
}

const charactersRequestSuccess = (models) => {
    return {
        type: CHARACTERS.SUCCESS,
        models
    }
}

const charactersRequestError = (errors) => {
    return {
        type: CHARACTERS.ERROR,
        errors
    }
}


export const charactersGet = (id) =>
    dispatch => {
        dispatch(charactersRequestInit());
        request.get(`/api/0.1/characters`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(charactersRequestSuccess(res.body));
                } else {
                    dispatch(charactersRequestError(res.body));
                }
        });
    };

const characterRequestInit = () => {
    return {
        type: CHARACTER.REQUEST
    }
}

const characterRequestSuccess = (model) => {
    return {
        type: CHARACTER.SUCCESS,
        model
    }
}

const characterRequestError = (errors) => {
    return {
        type: CHARACTER.ERROR,
        errors
    }
}


export const characterGet = (id) =>
    dispatch => {
        dispatch(characterRequestInit());
        request.get(`/api/0.1/character/${id}`)
            .end(function(err, res){
                if(res.ok) {
                    dispatch(characterRequestSuccess(res.body));
                } else {
                    dispatch(characterRequestError(res.body));
                }
        });
    };


export const characterPut = (id, fields) =>
    dispatch => {
        dispatch(characterRequestInit());
        request.put(`/api/0.1/character/${id}`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(characterRequestSuccess(res.body));
                } else {
                    dispatch(characterRequestError(res.body));
                }
        });
    };

export const characterPost = (fields) =>
    dispatch => {
        dispatch(characterRequestInit());
        request.post(`/api/0.1/character`)
            .send( { ... fields } )
            .end(function(err, res){
                if(res.ok) {
                    dispatch(characterRequestSuccess(res.body));
                    browserHistory.replace(`/character/${res.body.id}/edit`);
                } else {
                    dispatch(characterRequestError(res.body));
                }
        });
    };