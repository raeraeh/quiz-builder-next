CREATE TABLE `blocks` (
	`id` text PRIMARY KEY NOT NULL,
	`stepId` text,
	`position` integer,
	`type` text,
	`` text,
	FOREIGN KEY (`stepId`) REFERENCES `steps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `steps` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`quizId` text,
	FOREIGN KEY (`quizId`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE cascade
);
