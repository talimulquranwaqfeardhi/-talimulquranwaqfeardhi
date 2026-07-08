import React from 'react';

const Icon = ({ name, ...props }) => (
  <span aria-hidden="true" {...props} style={{display:'inline-block'}}>{name}</span>
);

export const Download = (props) => <Icon name="download" {...props} />;
export const FileText = (props) => <Icon name="file-text" {...props} />;
export const Calendar = (props) => <Icon name="calendar" {...props} />;
export const Category = (props) => <Icon name="category" {...props} />;
export const Play = (props) => <Icon name="play" {...props} />;
export const Youtube = (props) => <Icon name="youtube" {...props} />;
export const Search = (props) => <Icon name="search" {...props} />;
export const Clock = (props) => <Icon name="clock" {...props} />;
export const User = (props) => <Icon name="user" {...props} />;
export const BookOpen = (props) => <Icon name="book-open" {...props} />;
export const Users = (props) => <Icon name="users" {...props} />;
export const Award = (props) => <Icon name="award" {...props} />;
export const Send = (props) => <Icon name="send" {...props} />;
export const Mail = (props) => <Icon name="mail" {...props} />;
export const Phone = (props) => <Icon name="phone" {...props} />;
export const MapPin = (props) => <Icon name="map-pin" {...props} />;
export const GraduationCap = (props) => <Icon name="graduation-cap" {...props} />;
export const Filter = (props) => <Icon name="filter" {...props} />;
export const Book = (props) => <Icon name="book" {...props} />;
export const Languages = (props) => <Icon name="languages" {...props} />;
export const FileArchive = (props) => <Icon name="file-archive" {...props} />;
export const Video = (props) => <Icon name="video" {...props} />;
export const Link = (props) => <Icon name="link" {...props} />;

export default Icon;
