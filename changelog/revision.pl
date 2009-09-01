#!usr/local/bin/perl

$EXTNAME = "Googlebar Lite";

open INPUT, "< changelog.txt" or die "Cannot open input file: $!";
@lines = <INPUT>;
close INPUT;

open OUTPUT, "> changelog_HTML.txt" or die "Cannot open output file: $!";

$listLevel = 0;

#<p><strong><a href="/firefox/googlebarlite/googlebarlite_0_8_1.xpi">Install Version 0.8.1</a></strong>
#(en-US, da-DK, de-DE, nl-NL)
#<br />Released March 22, 2005</p>
#<ul>
#<li>Fixed a problem with one of the toolbarseparator elements.</li>
#</ul>

foreach $statement (@lines)
{
	chomp $statement;
	next if($statement =~ /^\/\//);

	$statement =~ s/&/&amp;/g;
	$statement =~ s/</&lt;/g;
	$statemetn =~ s/>/&gt;/g;
	$statement =~ s/"/&quot;/g;

	if($statement =~ /^\[([^\]]+)]\[([^\]]+)]/)
	{
		my $version = $1;
		my $release = $2;
		#my $locales = $3;

		my $vcopy = $version;
		$version =~ s/\./_/g;
		print OUTPUT "<p><strong><a href=\"/firefox/googlebarlite/googlebarlite_" . "$version" . ".xpi\">Install Version $vcopy</a></strong>\n";
		print OUTPUT "<br />Released $release</p>\n";
		next;
	}

	if($statement =~ /^h3\./)
	{
		$statement =~ s/h3\./<h3>Version /;
		print OUTPUT "$statement</h3>\n";
		next;
	}

	if($statement =~ /^\+/)
	{
		if($statement =~ /^\+:/)
		{
			$listLevel++;
			$statement =~ s/\+: /<li>/;
			print OUTPUT "$statement<ul>\n";
		}

		elsif($statement =~ /^\+\+/)
		{
			$statement =~ s/\+\+ /<li>/;
			print OUTPUT "$statement</li>\n";
		}

		elsif($statement =~ /^\+/)
		{
			if($listLevel == 0)
			{
				$listLevel++;
				print OUTPUT "<ul>\n";
			}
			$statement =~ s/\+ /<li>/;
			print OUTPUT "$statement</li>\n";
		}

		next;
	}

	if($statement =~ /^--$/)
	{
		print OUTPUT "\n<hr />\n";
		next;
	}

	if($listLevel == 2)
	{
		print OUTPUT "</ul></li></ul>\n";
		$listLevel = 0;
		next;
	}
	elsif($listLevel == 1)
	{
		print OUTPUT "</ul>\n";
		$listLevel = 0;
		next;
	}

	# The default case
	print OUTPUT "$statement\n";
}

close OUTPUT;
