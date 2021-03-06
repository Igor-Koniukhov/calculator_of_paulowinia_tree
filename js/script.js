$(function () {

	let selectSpice,
		selectPrice,
		selectedMethod,
		selectedQuantity,
		sortName,
		square = 1,
		sum,
		x ,
		y ,
		ga = 10000,
		money = {
			'g': [1, "грн"],
			'd': [28, "$"],
		},

		treeSpice = {

			"Paulownia Kvinerdji ": {"24 саженца": 1440, "  1 саж 2-x летн": 450, "1 корень": 120},
			"Paulownia Shan Tong ": {"24 саженца": 1440, "  1 саж 2-x летн": 450, "1 корень": 120},
			"Paulownia Pao Tong ": {"24 саженца": 1440, "  1 саж 2-x летн": 450, "1 корень": 120},


		},


		methodSeeding = {

			4: {" саженец / корень ": 625},
			5: {" саженец / корень ": 400},

		}


	function insertSortNames() {

		let html = '',
			spice;
		for (sortName in treeSpice) {
			for (spice in treeSpice[sortName]) {
				html += '<option data-sortName="' + sortName + '" data-spice="' + spice + '" data-price="' + treeSpice[sortName][spice] + '">' +
					' ' + sortName + ' - ' + spice + ' ' + treeSpice[sortName][spice] + ' ' + money.g[1] + '</option>';

			}

		}

		$('#tree-spice').append(html);
	}

	function insertMethodSeeding() {

		let html = '',
			method,
			qnt;
		for (method in methodSeeding) {
			for (qnt in methodSeeding[method]) {
				html += '<option data-method="' + (method + " x " + method) + '" data-qnt="' + methodSeeding[method][qnt] + '">' +
					' ' + (method + " x " + method) + ' - ' + qnt + '</option>';

			}

		}

		$('#method').append(html);
	}


	function changeSortName() {

		sum = square = 0;
		$("#width").val('4');
		$("#length").val('4');
		selectSpice = $('#tree-spice option').filter(':selected').data('spice');//извлекает данные из атрибута селектора option
		selectPrice = $('#tree-spice option').filter(':selected').data('price');//извлекает данные из атрибута селектора option


	}

	function changeMethodSeeding() {

		sum = 0;

		selectedMethod = $('#method option').filter(':selected').data('method');//извлекает данные из атрибута селектора option
		selectedQuantity = $('#method option').filter(':selected').data('qnt');//извлекает данные из атрибута селектора option
		/*$("#width").val(+selectedMethod.slice(0,1));
		$("#length").val(+selectedMethod.slice(0,1));*/


	}


	function changeWidth() {
		x = $("#width").val()
		if (x < 4) {
			x = 4;
			$("#width").val(4)
		}
	}

	function changeLength() {
		y = $("#length").val()
		if (y < 4) {
			y = 4;
			$("#length").val(4)
		}
	}


// isNumeric проверяет поступающее значение на число и возвращает true || false
	function isNumeric(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);

	}

	function recalc() {

		selectPrice = isNumeric(selectPrice) ? selectPrice : 0;
		selectSpice = (selectSpice != undefined) ? selectSpice : 0;
		x = isNumeric(x) ? x : 4;
		y = isNumeric(y) ? y : 4;
		/*square = isNumeric(square) ? square : x * y;*/
		selectedQuantity = isNumeric(selectedQuantity) ? selectedQuantity : 0;



		changeTable();

	}


	insertSortNames()
	insertMethodSeeding()


	$('#tree-spice').change(function () {
		changeSortName();
		recalc()
	});

	$('#method').change(function () {

		changeMethodSeeding()


		recalc()
	});

	/*x = +selectedMethod.slice(0,1)
	y = +selectedMethod.slice(0,1)*/

	$('#width').change(function () {
		changeWidth()
		recalc()
	})

	$('#length').change(function () {
		changeLength()
		recalc()
	})


	function changeTable() {
		square = x * y;
		$(".square").html(square + " m" + `<sup>` + "2" + `</sup>`)

		$(".tree-spice").text(sortName + selectSpice + ' ' + selectPrice + money.g[1])
		$(".price").text(selectPrice + money.g[1])
		$(".qnt").text(Math.floor(selectedQuantity * (square / ga)))
		console.log(selectedQuantity, "this is qnt")
		$(".sum").text(selectPrice * selectedQuantity * (square / ga))




	}


})
;
