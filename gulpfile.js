const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}

// Task to copy files to n8n custom directory
task('copy:n8n', function () {
	// Clear the destination directory
	const destPath = path.join(process.env.HOME, '.n8n/custom');
	const fs = require('fs-extra');
	fs.emptyDirSync(destPath);
	return src('dist/**/*').pipe(dest(path.join(process.env.HOME, '.n8n/custom')));
});
