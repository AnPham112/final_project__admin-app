import { categoryConstants } from "../actions/constants"

const initState = {
  categories: [],
  error: null
}

const buildNewCategories = (parentId, categories, category) => {
  let myCategories = [];

  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        type: category.type,
        children: []
      }
    ];
  }

  categories.map((cat) => {
    if (cat._id === parentId) {
      const newCategory = {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        type: category.type,
        children: []
      };
      myCategories.push({
        ...cat,
        children: cat.children.length > 0
          ? [...cat.children, newCategory]
          : [newCategory]
      })
    } else {
      myCategories.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : []
      });
    }
  });
  return myCategories;
}

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories
      }
      break;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = { ...state }
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
      state = {
        ...state,
        categories: updatedCategories
      }
      break;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        error: action.payload.error
      }
      break;
    case categoryConstants.UPDATE_CATEGORIES_REQUEST:
      state = { ...state }
      break;
    case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
      state = { ...state }
      break;
    case categoryConstants.UPDATE_CATEGORIES_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
    case categoryConstants.DELETE_CATEGORIES_REQUEST:
      state = { ...state }
      break;
    case categoryConstants.DELETE_CATEGORIES_SUCCESS:
      state = { ...state }
      break;
    case categoryConstants.DELETE_CATEGORIES_FAILURE:
      state = {
        ...state,
        error: action.payload.error
      }
      break;
  }
  return state;
}