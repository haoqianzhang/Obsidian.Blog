import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography, TextField, Button, Select, MenuItem, CircularProgress } from '@material-ui/core'
import { FixedSpace } from '../Utils'
import MarkdownIcon from './MarkdownIcon'
import { APIClient } from 'models'
import { CATEGORIES } from 'config'
import { withRouter } from 'react-router-dom'
import { green, red} from '@material-ui/core/colors'
import classNames from 'classnames'

const styles = theme => {
    const colors = theme.palette
    return {
        paper: {
            position: 'relative',
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 15,
            paddingBottom: 15,
        },
        title: {
            color: colors.primary.main,
            fontSize: '1.6em',
            fontWeight: 'bold',
        },
        subtitle: {
            color: colors.primary.main,
            fontSize: '1em',
            fontWeight: 600,
        },
        textField: {
            background: colors.grey[200],
            borderRadius: 5,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 15,
            paddingRight: 15,
        },
        mask: {
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            zIndex: 100
        },
        loginButton: {
            fontWeight: 'bold',
        },
        filter: {
            filter: 'blur(5px)',
        },
        hidden: {
            display: 'none',
        },
        markdownHint: {
            color: colors.grey[600],
        },
        wrapper: {
            margin: theme.spacing.unit,
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        buttonFailure: {
            backgroundColor: red[500],
            '&:hover': {
                backgroundColor: red[700],
            },
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    } 
}


class Publish extends Component {
    state = {
        title: '',
        subtitle: '',
        content : '',
        imageUrl: '',
        category: '',
        loading: false,
        success: false,
        failure: false,
    }

    handleTextFieldChange = (e, target) => {
        this.setState({ [target]: e.target.value })
    }

    handleSubmit = () => {
        this.setState({loading: true})
        if (this.state.category.length <= 0 ||
            this.state.title.length <= 0 ||
            this.state.subtitle.length <= 0 ||
            this.state.content.length <= 0
        ) {
            this.setState({loading: false, failure: true, success: false})
            return
        }
        APIClient.submit({
            username: 'serg',
            category: this.state.category,
            title: this.state.title,
            subtitle: this.state.subtitle,
            content: this.state.content,
            date: Math.floor(Date.now() / 1000),
            image: this.state.imageUrl,
            author: 'Haoqian Zhang',
            post_id: -1,
            email: 'vergil.choi.zyc@gmail.com',
        }).then(response => {
            this.setState({loading: false, success: true, failure: false})
            console.log(response)
            this.props.history.push('/')
        }).catch(error => {
            this.setState({loading: false, failure: true, success: true})
            console.error(error)
        })
    }

    render() {
        const { classes } = this.props
        const { title, content, imageUrl, subtitle, category, loading, success, failure } = this.state
        const buttonClassname = classNames({
            [classes.buttonSuccess]: success,
            [classes.buttonFailure]: failure,
        })
        return (
            <Grid container justify="center">
                <Grid item xs={8}>
                    <Typography className={classes.subtitle}>Title</Typography>
                    <TextField fullWidth className={classes.textField} InputProps={{disableUnderline: true}} onChange={(e) => this.handleTextFieldChange(e, 'title')} value={title}/>
                    <FixedSpace size="sm"/>
                    <Typography className={classes.subtitle}>Subtitle</Typography>
                    <TextField fullWidth className={classes.textField} InputProps={{disableUnderline: true}} onChange={(e) => this.handleTextFieldChange(e, 'subtitle')} value={subtitle}/>
                    <FixedSpace size="sm"/>
                    <Typography className={classes.subtitle}>Category</Typography>
                    <Select fullWidth className={classes.textField} onChange={(e) => this.handleTextFieldChange(e, 'category')} value={category} style={{overflow: 'hidden'}}>
                        {CATEGORIES.map((item, index) => {
                            return (<MenuItem value={item} key={index}>{item}</MenuItem>)
                        })}
                    </Select>
                    <FixedSpace size="sm"/>
                    <Typography className={classes.subtitle}>IPFS Image HASH</Typography>
                    <TextField fullWidth className={classes.textField} InputProps={{disableUnderline: true}} onChange={(e) => this.handleTextFieldChange(e, 'imageUrl')} value={imageUrl}/>
                    <FixedSpace size="sm"/>
                    <Typography className={classes.subtitle}>Content</Typography>
                    <TextField fullWidth multiline rows="10" className={classes.textField} InputProps={{disableUnderline: true}} onChange={(e) => this.handleTextFieldChange(e, 'content')} value={content}/>
                    <FixedSpace size="xs3"/>
                    <Grid container >
                        <Grid item><MarkdownIcon /></Grid>
                        <Grid item><Typography className={classes.markdownHint}>&nbsp;&nbsp;Styling with Markdown is supported</Typography></Grid>
                    </Grid>
                    <FixedSpace size="sm"/>
                    <div className={classes.wrapper}>
                        <Button fullWidth variant="raised" color="secondary" size="large" onClick={this.handleSubmit} className={buttonClassname} disabled={loading}>
                            <Typography color="primary" style={{fontWeight: 'bold', color: 'white'}}>Publish</Typography>
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    <FixedSpace size="lg"/>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(withStyles(styles)(Publish))