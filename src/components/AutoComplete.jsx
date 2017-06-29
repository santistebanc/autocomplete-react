import React from 'react';
import SuggestionsList from './SuggestionsList.jsx'
import SearchBox from './SearchBox.jsx'

export default class extends React.Component {
  state = { text: "", show: false, list: [], selectedIndex: -1 }
  static get defaultProps() {
    return { data: [], onChange: () => { }, onSubmit: () => { } }
  }
  searchSuggestions = async (query) => {
    //to be called whenever a new suggestions-list needs to be generated
    let results = [];

    if (typeof this.props.data === "function" && typeof this.props.data(query).then === 'function') {
      //if data is a Promise
      results = await this.props.data(query);
    }
    else if (typeof this.props.data === "function") {
      //if data is a Function
      results = this.props.data(query);
    } else if (this.props.data instanceof Array) {
      //if data is an Array
      results = this.props.data;
    }
    this.setState({ list: results, selectedIndex: -1 });
  }
  handleChangeText = (e) => {
    //when the input text of user changes
    this.setState({ show: true, text: e.currentTarget.value });
    this.searchSuggestions(e.currentTarget.value);
    this.props.onChange(e.currentTarget.value); //notify that input has changed
  }
  handleFocus = (e) => {
    //called when the input field is focused
    if (!this.justClickedAnOption) e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)
    this.justClickedAnOption = false;
  }
  handleBlur = (e) => {
    //called when the input field loses focus
    this.setState({ show: false });

    //refocus if the blur was caused by having selected a suggestion
    if (this.justClickedAnOption) e.currentTarget.focus();
  }
  handleClickItem = (selectedItem) => {
    //called when user clicks a suggestion
    this.justClickedAnOption = true;
    this.searchSuggestions(selectedItem.title);
    this.setState({ text: selectedItem.title, list: [], show: false });
    if (selectedItem.title !== this.state.text) this.props.onChange(selectedItem.title); //notify that input has changed
    this.props.onSubmit(selectedItem.title); //notify that input has been submitted
  }
  handleSelect = (selectedItem) => {
    //called when user selects a suggestion with keyboard
    const userText = this.originalQuery == undefined ? "" : this.originalQuery
    const newText = selectedItem == undefined ? userText : selectedItem.title;
    if (newText !== this.state.text) {
      this.setState({ text: newText });
      this.props.onChange(newText); //notify that input has changed
    }
  }
  handleKeyDown = (e) => {
    //whenever the user presses a keyboard key
    if (e.key == "Enter") {
      this.searchSuggestions(this.state.text);
      this.setState({ show: false });
      this.props.onSubmit(this.state.text); //notify that input has been submitted
    }
    if (e.key == "ArrowUp" || e.key == "ArrowDown") {
      e.preventDefault();
      if (this.state.selectedIndex == -1) {
        this.originalQuery = this.state.text;
      }
      if (!this.state.show) {
        if (this.state.list.length == 0) this.searchSuggestions(this.state.text);
        this.setState({ show: true });
      } else {
        let nextIndex = this.state.selectedIndex;
        if (e.key == "ArrowUp") nextIndex--;
        if (e.key == "ArrowDown") nextIndex++;
        if (nextIndex >= this.state.list.length) nextIndex = -1;
        if (nextIndex < -1) nextIndex = this.state.list.length - 1;
        this.setState({ selectedIndex: nextIndex, show: true });
        this.handleSelect(this.state.list[nextIndex]);
      }
    }
  }
  render() {
    return (
      <div className="autocomplete" style={this.props.style}>

        <SearchBox value={this.state.text} onChange={this.handleChangeText} onBlur={this.handleBlur} onFocus={this.handleFocus} onKeyDown={this.handleKeyDown} placeholder={this.props.placeholder} />

        {this.state.show && this.state.list.length > 0 && <div style={{ position: 'relative' }}>
          <SuggestionsList list={this.state.list} onClickItem={this.handleClickItem} selectedIndex={this.state.selectedIndex} />
        </div>}

      </div>);
  }
}
