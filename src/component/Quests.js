import { Checkbox, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Toolbar, Typography, TableHead, TextField, Button } from '@material-ui/core';
import React from 'react';
import Rewards from '../data/rewards.json'
import Levelup from '../data/levelup.json'
import SaveIcon from '@material-ui/icons/SaveAltRounded';
import UploadIcon from '@material-ui/icons/CloudUploadSharp';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    maxWidth: 600,
    cursor: "default"
  },
  levelsuccess : {
    background: '#009688',
    color: 'white'
  },
  leveldefault : {
    background: 'white',
    color: 'black'
  },
  levelnull : {
    background: 'grey'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function Quests() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [teamName, setTeamName] = React.useState("")
  const [file, setFileName] = React.useState("")

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const handleClick = (event, name, score) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    var valuescore = total + score
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      valuescore = total - score;
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      valuescore = total - score;
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      valuescore = total - score;
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setTotal(valuescore);
    setSelected(newSelected);
  };

  const handleFile = (event) => { 
    var fReader = new FileReader();

    fReader.readAsText(event.target.files[0]);

    fReader.onload = function () {
        var content = JSON.parse(fReader.result)
        var questValue = 0.00
        content.forEach(c => {
          Rewards.rewards.forEach(r => {
            var u = r.data.find(d => d.title === c)
            if (u) {
              questValue += u.score
            }
          })
        })
        setSelected(content)
        setTotal(questValue)
    }
    fReader.onerror = function () {
        console.error(fReader.error)
    }
  }

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  }

  var questsSelector = Rewards.rewards.map(function(element, eindex)
    {
      return(
        <div className={classes.root}>
          <Paper elevation={0} className={classes.paper}>
            <Toolbar>
              <Typography>{element.title}</Typography>
            </Toolbar>
            <TableContainer>
              <Table className={classes.table} padding='checkbox' size='small'>
                <TableBody>
                {element.data.map(function(line, index)
                    {
                      const isItemSelected = isSelected(line.title);
                      return(
                        <TableRow hover role="checkbox" 
                          aria-checked={isItemSelected} 
                          onClick={(event) => handleClick(event, line.title, line.score)}
                          key={line.title} selected={isItemSelected}>
                          <TableCell padding="checkbox"><Checkbox checked={isItemSelected}></Checkbox></TableCell>
                          <TableCell padding="none" align='left'>
                            {line.title}
                          </TableCell>
                          <TableCell  align='right'>
                            {line.score}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      )
    }
  )

  var levelInfos = Levelup.map( line => {

    const getClassName = (score) => {
        if (score == null)
          return classes.levelnull
        if (total >= score)
          return classes.levelsuccess
        else
          return classes.leveldefault
    }
    return (
      <TableRow>
        <TableCell>Reaches level {line.nextlevel}</TableCell>
        <TableCell className={getClassName(line.smallparty)}>{line.smallparty}</TableCell>
        <TableCell className={getClassName(line.bigparty)}>{line.bigparty}</TableCell>
      </TableRow>
    )
  })

  return( 
  <div style={{ height: 400, width: '100%' }}>
    <Grid container justify="space-evenly">
      <Grid item xs={12} sm={6}>
        {questsSelector}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper elevation={0} className={classes.paper}>
          <TextField label='Team Name' value={teamName} onChange={handleTeamNameChange}/>
          <TableContainer>
            <Table className={classes.table} padding='checkbox' size='small'>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>Points earned: {total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Small Party</TableCell>
                  <TableCell>Big Party</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levelInfos}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="default" startIcon={<SaveIcon/>}
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(selected))}`} download={teamName.concat('.json')}>
            Download Json
          </Button>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadIcon/>}
          >
            Upload File
            <input
              type="file"
              value={file}
              onChange={handleFile}
              accept=".json"
              hidden
            />
          </Button>
          {file}
        </Paper>
      </Grid>
    </Grid>
    
  </div>
  )
}