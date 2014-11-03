function CSVparser() {

    this.parse = parse;
    this.split = split;
    this.findSep = findSep;

    this.data = new Array();
    this.sep = ',';

    function parse( CSVString ) {

        var i = 0;

        this.findSep( CSVString.substr( 0, CSVString.indexOf("\n",0) ) );

        while (i < CSVString.length) {
            var j = CSVString.indexOf("\n", i);
            if (j == -1) j = CSVString.length;

            this.data.push( this.split( CSVString.substr( i, j-i) ) );

            i = j+1;
        }
    }

    function split( line ) {
        // some code that fixes wild decimal separators ( , to . )
        var temp = line.split( this.sep );
        var i;
        for ( i = 0; i < temp.length; ++i) {
            temp[i] = temp[i].replace(",",".");
        }
        return temp
        // return line.split( this.sep );
    }

    function findSep( line ) {
        // start with ; for silly excel
        var i = line.indexOf(";");

        if ( i != -1 ) {
            this.sep = ";";
            console.log("separator is ; which isn't really the standard is it");
            i = line.indexOf(",");
            if ( i != -1 ) {
                console.log("someone has put , in the integers or something!!");
            }
            return;
        }

        i = line.indexOf(",");
        if ( i != -1 ) return;

        console.log("could not determine separator!");
    }

}
