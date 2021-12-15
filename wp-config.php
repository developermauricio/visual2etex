<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME','virtualetexproduccion' );

/** MySQL database username */
define( 'DB_USER', 'forge' );

/** MySQL database password */
define( 'DB_PASSWORD', 'uwlsSOyzQYbhxNEwY4cS' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

// TODO: custom subir archivos
define('ALLOW_UNFILTERED_UPLOADS', true); 

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'fhi6oktwcwwtwwj3cakoznqa9j4ft1miqyv93nwlh5nmopowrh8cv9h3ficsog0y' );
define( 'SECURE_AUTH_KEY',  '28hpnq0rbrv9mtpmmwdqjcgrhkha9u4rwvhfmeycm7ipl8chyngzak4cwkuxykxt' );
define( 'LOGGED_IN_KEY',    'viq7h3quiitmgl5zftmpu8qlbzuw46ighdelthzdcja0fck9iie9jgmrzsk0scyv' );
define( 'NONCE_KEY',        'cyvbpngiwfuhd8o8ugw7mv1xri7z2qocpbesaffjqx2nyt2wpge9sej6zczlgfou' );
define( 'AUTH_SALT',        'cxxqedojursnvvwhk95da4apbb56r2buriblrg02dnfznkt3ljulpbrxbgw6sm0k' );
define( 'SECURE_AUTH_SALT', 'ynh6wglctrcekzlanogkeexwfn1opotduhce9wrghwbafcclnbdhthgruodhhw7p' );
define( 'LOGGED_IN_SALT',   '4qlxc4p2uwgvu5yuf7enaub1be5sljfyrao1rwtfxebc92grr6zizwdwfxbzobst' );
define( 'NONCE_SALT',       'sij6we3g6rnieb1r43qwqvng5eb1flxzby6nlwohlrn9aukp8gcs6lwxkkzlqzeo' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpye_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
