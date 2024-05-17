# Contributing to flutterconKE2024 Web

We'd love to accept your patches!
To contribute to _flutterconKE2024_ simply open a pull request against the [dev branch](https://github.com/droidconKE/flutterconKE2024Web/tree/dev)

To ensure you that your pull request is accepted:

1. Describe your changes in the pull request description.
2. Be consistent with the coding style.
3. Make commits of logical units
4. Write descriptive commit messages and not 2 worded commits.
5. Run lint checks `yarn lint` and fix all warnings and errors
6. For all colors and fonts, use provided color classes in `styles/global.css`. In case of addition, define the colors in `tailwind.config.js` and define both light and dark version for it

- For every color, bg-color, border etc, define it's dark version eg; `text-primary dark:text-primary border-accent dark:border-accent bg-white dark:bg-dark`
- For `white` color, use `dark:bg-dark` for backgrounds and `dark:text-white-dark` for colors and borders
- Use custom defined colors eg primary, secondary, accent, accent-2, secondary02 etc, don't use tailwindcss defined colors

7. Page responsiveness in a priority, _Tailwind CSS_ is used in the design
8. Always build with SSR in mind

N/B All the designs will be provided here: https://xd.adobe.com/view/fdf07d1d-1d50-4739-b2d9-191e9268f9d1-a8a3/
