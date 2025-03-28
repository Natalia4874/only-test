import { fixupPluginRules } from '@eslint/compat'
import eslintJs from '@eslint/js'
import eslintMarkdown from '@eslint/markdown'
import eslintHtml from 'eslint-plugin-html'
import eslintJson from 'eslint-plugin-json'
import eslintMobx from 'eslint-plugin-mobx'
import eslintPerfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactNative from 'eslint-plugin-react-native'
import globals from 'globals'
import eslintTypeScript from 'typescript-eslint'

import {
  sortClasses,
  sortEnums,
  sortInterfaces,
  sortIntersectionTypes,
  sortJSXProps,
  sortMaps,
  sortObjects,
  sortObjectTypes,
  sortUnionTypes
} from './perfectionist/index.js'

export default [
  eslintJs.configs.recommended,
  ...eslintTypeScript.configs.recommended,
  ...eslintMarkdown.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    plugins: {
      mobx: eslintMobx,
      react: eslintReact,
      'react-hooks': fixupPluginRules(eslintReactHooks),
      html: eslintHtml,
      perfectionist: eslintPerfectionist,
      'react-native': fixupPluginRules(eslintReactNative)
    }
  },
  {
    ignores: ['dist', 'node_modules', 'eslint.config.mjs']
  },
  {
    files: ['**/*.json'],
    ...eslintJson.configs['recommended']
  },
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    rules: {
      // react-hooks configs recommended rules
      ...eslintReactHooks.configs.recommended.rules,

      'react/jsx-fragments': ['error', 'element'],

      // @typescript-eslint
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // Sometimes you need an empty one, for example when extends
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      // react
      // TODO: make rule "react/prop-types" as error only for JS(x) files
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',

      // react-hooks
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // disables the requirement to format ternary operators in multiline form
      'multiline-ternary': 'off',
      // shorthand for methods and properties of objects
      'object-shorthand': ['warn', 'consistent'],

      // Class
      'perfectionist/sort-classes': sortClasses,
      // Enum
      'perfectionist/sort-enums': sortEnums,
      // Interfaces
      'perfectionist/sort-interfaces': sortInterfaces,
      // Intersection types
      'perfectionist/sort-intersection-types': sortIntersectionTypes,
      // JSX props
      'perfectionist/sort-jsx-props': sortJSXProps,
      // Maps
      'perfectionist/sort-maps': sortMaps,
      // Objects
      'perfectionist/sort-objects': sortObjects,
      // Objects-types
      'perfectionist/sort-object-types': sortObjectTypes,
      // Union types
      'perfectionist/sort-union-types': sortUnionTypes,

      'mobx/exhaustive-make-observable': 'warn',
      'mobx/missing-make-observable': 'error',
      'mobx/missing-observer': 'off',
      'mobx/no-anonymous-observer': 'warn',
      'mobx/unconditional-make-observable': 'error',

      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'off',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': 'off',
      'react-native/no-single-element-style-arrays': 'error'
    }
  }
]
