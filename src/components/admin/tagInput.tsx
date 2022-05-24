import { useState } from 'react'

const TagsInput = (props: any) => {
  console.log("props", props)
  const [tags, setTags] = useState(props.tags);
  const removeTags = (indexToRemove: any) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    props.selectedTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      if (tags.length > 0) {
        setTags([...tags, event.target.value]);
        props.selectedTags([...tags, event.target.value]);
      }
      else {
        setTags([event.target.value]);
        props.selectedTags([...tags, event.target.value]);

      }
      event.target.value = "";
    }
  };
  return (
    <div className="tags-input">
      <ul id="tags">
        {tags && tags?.map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon'
              onClick={() => removeTags(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
        placeholder="Press enter to add tags"
      />
    </div>
  );
}

export default TagsInput